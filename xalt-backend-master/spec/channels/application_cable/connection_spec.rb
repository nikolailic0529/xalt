# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationCable::Connection, type: :channel do
  let(:current_user) { create(:user, :admin) }
  let(:my_headers) do
    auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
  end

  it 'successfully connects' do
    connect "/cable?access_token=#{my_headers['access-token']}&access_client=#{my_headers['client']}"\
            "&access_uid=#{my_headers['uid']}"
    expect(connection.current_user.id).to eq current_user.id
  end

  it 'rejects connection' do
    expect { connect '/cable' }.to have_rejected_connection
  end
end
