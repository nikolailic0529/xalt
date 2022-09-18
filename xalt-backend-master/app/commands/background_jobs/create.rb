# frozen_string_literal: true

module BackgroundJobs
  class Create < Core::BaseCommand
    attribute :job_name, String
    attribute :arguments, Hash, default: {}
    attribute :perform_now, Boolean, default: false
    attribute :wait_until

    attr_reader :background_job, :active_job

    def authorized?
      true
    end

    def process
      create_background_job_in_database
      put_active_job_in_queue
      set_active_job_args_to_background_job_model unless perform_now
    end

    def broadcast_ok
      broadcast(:ok, background_job)
    end

    private

    def put_active_job_in_queue
      @active_job = if wait_until
                      Object.const_get(job_name).set(wait_until: wait_until).perform_later(background_job_arguments)
                    elsif perform_now
                      Object.const_get(job_name).perform_now(background_job_arguments)
                    else
                      Object.const_get(job_name).perform_later(background_job_arguments)
                    end
    end

    def background_job_arguments
      arguments.merge(background_job_id: background_job.id)
    end

    def create_background_job_in_database
      @background_job = BackgroundJob.create!(name:      job_name,
                                              arguments: arguments,
                                              status:    :pending)
    end

    def set_active_job_args_to_background_job_model
      background_job.update!(active_job_id: active_job.job_id, queue_name: active_job.queue_name)
    end
  end
end
