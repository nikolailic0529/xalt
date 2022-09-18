# frozen_string_literal: true

require 'stripe'

Stripe.api_key = ENV.fetch('STRIPE_API_KEY', '')
