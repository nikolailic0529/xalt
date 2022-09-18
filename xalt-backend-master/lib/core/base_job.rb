# frozen_string_literal: true

class Core::BaseJob < ApplicationJob
  # Available statuses: pending, running, canceled, done, failed

  rescue_from(StandardError) do |exception|
    raise exception if background_job.nil?

    error_message = "#{exception.message}\n#{exception.backtrace.join("\n\t")}"
    background_job.update!(status: :failed, error_message: error_message)
    # rubocop:disable Rails/SkipsModelValidations
    background_job.increment!(:failures_count)
    # rubocop:enable Rails/SkipsModelValidations
    if background_job.failures_count < max_retries_count
      on_retry(exception)
      raise exception
    else
      on_failure(exception)
    end
  end

  before_enqueue do |active_job|
    background_job_id = (active_job.arguments.first || {})[:background_job_id]
    if background_job_id.present?
      background_job = BackgroundJob.find(background_job_id)
      background_job.update!(status: :running)
    end
  end

  after_perform do |active_job|
    background_job_id = (active_job.arguments.first || {})[:background_job_id]
    BackgroundJob.find(background_job_id).update!(status: :done) if background_job_id.present?
  end

  def background_job
    @background_job ||= BackgroundJob.find_by(id: (arguments.first || {})[:background_job_id])
  end

  def max_retries_count
    5
  end

  def on_retry(exception); end

  def on_failure(exception); end
end
