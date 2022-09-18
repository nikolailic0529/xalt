# frozen_string_literal: true

class UserMailer < Drill::Mailer
  include MailerLinkHelper

  def confirmation_instructions(record, _token, _opts={})
    @individual = record
    @to_email = @individual.email
    @name = @individual.name
    @confirmation_link = get_confirmation_link(@individual)
    template_name = 'new_welcome_email'
    template_name = 'new_welcome_email_coach' if @individual.role == 'coach'

    mail(from_email: 'noreply@xalt.fit', from_name: 'xAlt Fitness',
         to: @to_email, template_name: template_name, subject: 'Verify your email address')
  end

  def reset_password_instructions(record, _token, _opts={})
    @individual = record
    @to_email = @individual.email
    @reset_password_link = get_reset_password_link(@individual)
    mail(from_email: 'noreply@xalt.fit', from_name: 'xAlt Fitness',
         to: @to_email, template_name: 'new_reset_password', subject: 'Reset password')
  end

  def send_contact_us(params)
    to_email = 'info@xAlt.fit'
    @from_email = params[:email]
    @full_name = params[:full_name]
    @message = params[:message]

    mail(from_email: @from_email, from_name: @full_name, to: to_email, template_name: 'new_contact_us')
  end

  def send_email_notification(params)
    @to_email = params[:user][:email]
    @username = params[:user][:name]
    @content = params[:content]
    @app_link = generate_app_link

    mail(from_email: 'noreply@xalt.fit', from_name: 'xAlt Fitness',
         to: @to_email, template_name: 'new_email_notification', subject: 'Notification')
  end

  def send_email_notification_about_meeting(params)
    @to_email = params[:user][:email]
    @username = params[:user][:name]

    @meet_url = params[:meeting][:google_meet_url]

    mail(from_email: 'noreply@xalt.fit', from_name: 'xAlt Fitness',
         to: @to_email, template_name: 'new_email_notification_about_meeting', subject: 'Session starts soon')
  end

  def send_report_notification(params)
    @to_email = params[:user][:email]
    @username = params[:user][:name]
    @coach_name = params[:coach][:name]
    @coach_image_url = params[:coach][:avatar]
    @meeting_time = params[:meeting_time]
    @summary = params[:report][:summary]
    @additional_comment = params[:report][:additional_comment]
    @physical_fitness_level = params[:answer][:physical_fitness_level]
    @quality_of_sleep = params[:answer][:quality_of_sleep]
    @stress_levels = params[:answer][:stress_levels]
    @quality_of_diet = params[:answer][:quality_of_diet]
    @overall_happiness = params[:answer][:overall_happiness]
    @level_of_community = params[:answer][:level_of_community]
    @app_link = generate_app_link

    mail(from_email: 'noreply@xalt.fit', from_name: 'xAlt Fitness',
         to: @to_email, template_name: 'new_report', subject: 'Report is ready')
  end
end
