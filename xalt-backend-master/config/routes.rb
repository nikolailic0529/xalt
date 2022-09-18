# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq'
  mount ActionCable.server => '/cable'

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'users/registrations',
    sessions:      'users/sessions',
    passwords:     'users/reset_password'
  }

  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development? || ENV.fetch('LETTER_OPENER',
                                                                                             'false') == 'true'

  root to: 'system_info#index'
  get '/healthz', to: 'system_info#index'
  get '/confirm_user/:id', to: 'users/confirmations#confirm_user'

  namespace :api do
    namespace :v1 do
      resources :users
      resources :vote_records, only: %i[create destroy]
      resources :coaches, only: :index
      resources :members, only: :index
      resources :exercises
      resources :member_challenges
      resources :user_member_challenges
      resources :user_member_challenge_check_ins
      resources :subscriptions, only: %i[index]
      resources :conversations, only: %i[index update]
      resources :messages, only: %i[index create]
      resources :notifications, only: %i[index update destroy] do
        delete :bulk_destroy, on: :collection
      end
      resources :coach_profiles, only: %i[create update show]
      resources :meetings, only: %i[index show create update]
      resources :report_questions, only: %i[index]

      resources :fitnes_domains, only: %i[index]

      get :self_info, controller: 'users'
      post :contact_us, controller: 'contact_us'

      put :update_current_user, controller: 'users'
      put :change_password, controller: 'users'
      post :stripe_init, controller: :payments, action: :init
      post :charge, controller: :payments, action: :charge
      post :one_time_checkout, controller: :payments, action: :one_time_charge
      post :change_card, controller: :payments, action: :change_card
      post :create_subscription, controller: :payments, action: :create_subscription
      post :cancel_subscription, controller: :payments, action: :cancel_subscription

      namespace :coach do
        resources :reports, only: %i[create update index show]
        resources :programs, only: %i[create update index show]
        resources :program_exercises, only: :destroy
        resources :coach_documents, only: %i[create update index show destroy]
      end

      namespace :member do
        resources :member_profiles, only: %i[create update show] do
          member do
            put :measurements
          end
        end
        resources :member_question_answers
        resources :programs, only: %i[index show update]
        resources :member_crves, only: %i[index show create]
        post :question_answer_for_member, controller: :member_question_answers, action: :question_answer_for_member
        post :member_recommendations, controller: :member_crves, action: :recommendations
      end

      namespace :analytics do
        resources :widgets, only: :index
      end
    end
  end

  namespace :stripe do
    resource :accounts do
      get :current_account
      post :create_link
      post :create_bank_account
      put :update_bank_account
      delete :destroy_bank_account
    end
    resource :payouts, only: :index
    resource :events do
      collection do
        post :invoice
        post :account
        post :payout
      end
    end
  end
end
