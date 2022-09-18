# frozen_string_literal: true

FactoryBot.define do
  factory :exercise do
    name                { Faker::Name.name }
    description         { 'Some description' }
    categorie           { 'full_body' }
    equipment           { 'barbell' }
    difficulty          { 'beginner' }
    agonist             { 'agonist' }
    movement            { 'Some move' }
    relevant            { 'relevant' }
    start_pos           { 'start_pos' }
    end_pos             { 'end_pos' }
    instruction         { 'instruction' }
    is_competition      { false }
    is_private          { true }
    vimeo_video_url     { '' }
    vimeo_video_info    { {video_url: 'https://video.com/123'} }
    user                { create(:user, :coach) }
  end
end
