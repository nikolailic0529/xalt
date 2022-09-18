# frozen_string_literal: true

module Exercises
  class Update < Core::BaseCommand
    attribute :exercise,             Exercise
    attribute :current_user,         User
    attribute :name,                 String
    attribute :description,          String
    attribute :categorie,            String
    attribute :equipment,            String
    attribute :difficulty,           String
    attribute :movement,             String
    attribute :agonist,              String
    attribute :relevant,             String
    attribute :start_pos,            String
    attribute :end_pos,              String
    attribute :instruction,          String
    attribute :video_url,            String
    attribute :is_competition,       Virtus::JsonapiBooleanFilterAttributes
    attribute :vimeo_video_url,      String
    attribute :is_private,           Virtus::JsonapiBooleanFilterAttributes
    attribute :s3_video_file

    validates :name, :description, :categorie, :equipment, :difficulty, presence: true

    validates :categorie, inclusion: {in: Exercise::CATEGORIES}
    validates :difficulty, inclusion: {in: Exercise::DIFFICULTIES}
    validates :equipment, inclusion: {in: Exercise::EQUIPMENTS}
    include Core::BaseValidator

    def authorized?
      current_user.coach? || current_user.admin?
    end

    def process
      update_exercise
      exercise.reload
    end

    def broadcast_ok
      broadcast(:ok, exercise)
    end

    protected

    def update_exercise
      exercise.update!(params)
    end

    def params
      updated_attributes.except!(:current_user, :exercise)
    end
  end
end
