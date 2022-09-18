# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_08_172926) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "background_jobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.jsonb "arguments", null: false
    t.string "status", null: false
    t.string "active_job_id"
    t.string "queue_name"
    t.string "error_message"
    t.integer "failures_count", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "billing_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "meeting_id"
    t.uuid "subscription_id"
    t.uuid "coach_profile_id"
    t.uuid "member_profile_id"
    t.decimal "amount", default: "0.0", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "direction"
    t.decimal "xalt_fee", default: "0.0"
    t.index ["coach_profile_id"], name: "index_billing_records_on_coach_profile_id"
    t.index ["meeting_id"], name: "index_billing_records_on_meeting_id"
    t.index ["member_profile_id"], name: "index_billing_records_on_member_profile_id"
    t.index ["subscription_id"], name: "index_billing_records_on_subscription_id"
  end

  create_table "coach_documents", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "file", null: false
    t.uuid "coach_profile_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "is_verified", default: false, null: false
    t.index ["coach_profile_id"], name: "index_coach_documents_on_coach_profile_id"
  end

  create_table "coach_fitnes_domains", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "fitnes_domain_id"
    t.uuid "coach_profile_id"
    t.index ["coach_profile_id"], name: "index_coach_fitnes_domains_on_coach_profile_id"
    t.index ["fitnes_domain_id"], name: "index_coach_fitnes_domains_on_fitnes_domain_id"
  end

  create_table "coach_profiles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "about", default: "", null: false
    t.jsonb "social_network_links", default: {}, null: false
    t.boolean "verified", default: false, null: false
    t.boolean "xalt_sertified", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "user_id"
    t.float "earnings", default: 0.0, null: false
    t.string "gender"
    t.string "coach_intensity"
    t.string "coach_mode"
    t.jsonb "coach_styles"
    t.integer "rate"
    t.string "timezone"
    t.integer "training_since"
    t.jsonb "loves"
    t.string "why_with_me_video"
    t.boolean "featured", default: false
    t.boolean "rehabilitation", default: false
    t.index ["user_id"], name: "index_coach_profiles_on_user_id"
  end

  create_table "conversation_users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "conversation_id"
    t.uuid "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "deleted_at"
    t.index ["conversation_id"], name: "index_conversation_users_on_conversation_id"
    t.index ["deleted_at"], name: "index_conversation_users_on_deleted_at"
    t.index ["user_id"], name: "index_conversation_users_on_user_id"
  end

  create_table "conversations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_conversations_on_deleted_at"
  end

  create_table "data_migrations", primary_key: "version", id: :string, force: :cascade do |t|
  end

  create_table "exercises", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.string "categorie", null: false
    t.string "equipment", null: false
    t.string "difficulty", null: false
    t.string "movement"
    t.string "video_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "user_id"
    t.boolean "is_private", default: true
    t.jsonb "vimeo_video_info", default: {}, null: false
    t.string "s3_video_file"
    t.string "vimeo_video_url", default: "", null: false
    t.text "agonist"
    t.text "relevant"
    t.string "start_pos"
    t.string "end_pos"
    t.text "instruction"
    t.boolean "is_competition"
    t.index ["user_id"], name: "index_exercises_on_user_id"
  end

  create_table "fitnes_domains", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "coach_domain_name", default: "", null: false
    t.string "member_goal_name", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "meetings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "time_from", null: false
    t.datetime "time_to", null: false
    t.boolean "is_member_confirmed", default: false, null: false
    t.uuid "member_profile_id"
    t.uuid "coach_profile_id"
    t.uuid "program_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "google_meet_url"
    t.string "report_id"
    t.boolean "is_finished", default: false, null: false
    t.index ["coach_profile_id"], name: "index_meetings_on_coach_profile_id"
    t.index ["member_profile_id"], name: "index_meetings_on_member_profile_id"
    t.index ["program_id"], name: "index_meetings_on_program_id"
  end

  create_table "member_challenges", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "category"
    t.text "incentives"
    t.string "video_url"
    t.string "schedule"
    t.string "corporate_tag"
    t.datetime "start"
    t.datetime "end"
    t.boolean "is_competition"
    t.boolean "is_private"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "user_id"
    t.index ["user_id"], name: "index_member_challenges_on_user_id"
  end

  create_table "member_crves", force: :cascade do |t|
    t.string "sex"
    t.integer "age"
    t.decimal "wc"
    t.integer "rhr"
    t.decimal "pa"
    t.decimal "crf"
    t.uuid "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_member_crves_on_user_id"
  end

  create_table "member_fitnes_domains", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "fitnes_domain_id"
    t.uuid "member_profile_id"
    t.index ["fitnes_domain_id"], name: "index_member_fitnes_domains_on_fitnes_domain_id"
    t.index ["member_profile_id"], name: "index_member_fitnes_domains_on_member_profile_id"
  end

  create_table "member_profiles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "hours_spend_last_week", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "user_id"
    t.uuid "coach_profile_id"
    t.uuid "subscription_id"
    t.integer "move_per_week_current"
    t.integer "move_per_week_plan"
    t.jsonb "exercise_places"
    t.jsonb "coach_gender_preference"
    t.jsonb "ideal_coach"
    t.string "intensity_level"
    t.string "rate_preference"
    t.integer "session_per_week"
    t.jsonb "measurements"
    t.index ["coach_profile_id"], name: "index_member_profiles_on_coach_profile_id"
    t.index ["subscription_id"], name: "index_member_profiles_on_subscription_id"
    t.index ["user_id"], name: "index_member_profiles_on_user_id"
  end

  create_table "member_question_answers", force: :cascade do |t|
    t.string "identifier"
    t.json "answer"
    t.uuid "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_member_question_answers_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "content", null: false
    t.uuid "conversation_id"
    t.uuid "sender_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "notifications", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "content", default: "", null: false
    t.string "type", null: false
    t.boolean "mark_as_read", default: false, null: false
    t.uuid "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "additional_info", default: {}
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text "content"
    t.string "searchable_type"
    t.uuid "searchable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id"
  end

  create_table "program_exercises", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "sets"
    t.string "repetitions"
    t.integer "repetitions_duration"
    t.string "link_url"
    t.uuid "exercise_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "program_id"
    t.index ["exercise_id"], name: "index_program_exercises_on_exercise_id"
    t.index ["program_id"], name: "index_program_exercises_on_program_id"
  end

  create_table "programs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "description", null: false
    t.string "type", null: false
    t.uuid "coach_profile_id"
    t.uuid "member_profile_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "completed", default: false, null: false
    t.datetime "program_date"
    t.index ["coach_profile_id"], name: "index_programs_on_coach_profile_id"
    t.index ["member_profile_id"], name: "index_programs_on_member_profile_id"
  end

  create_table "read_marks", id: :serial, force: :cascade do |t|
    t.string "readable_type", null: false
    t.uuid "readable_id"
    t.string "reader_type", null: false
    t.uuid "reader_id"
    t.datetime "timestamp"
    t.index ["readable_type", "readable_id"], name: "index_read_marks_on_readable_type_and_readable_id"
    t.index ["reader_id", "reader_type", "readable_type", "readable_id"], name: "read_marks_reader_readable_index", unique: true
    t.index ["reader_type", "reader_id"], name: "index_read_marks_on_reader_type_and_reader_id"
  end

  create_table "report_answers", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "score"
    t.string "answer"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "report_question_id"
    t.uuid "report_id"
    t.index ["report_id"], name: "index_report_answers_on_report_id"
    t.index ["report_question_id"], name: "index_report_answers_on_report_question_id"
  end

  create_table "report_questions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "title", null: false
    t.string "question_type", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "report_report_questions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "report_id"
    t.uuid "report_question_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["report_id"], name: "index_report_report_questions_on_report_id"
    t.index ["report_question_id"], name: "index_report_report_questions_on_report_question_id"
  end

  create_table "reports", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "summary"
    t.text "additional_comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "member_profile_id"
    t.uuid "coach_profile_id"
    t.boolean "is_filled", default: false
    t.uuid "meeting_id"
    t.index ["coach_profile_id"], name: "index_reports_on_coach_profile_id"
    t.index ["meeting_id"], name: "index_reports_on_meeting_id"
    t.index ["member_profile_id"], name: "index_reports_on_member_profile_id"
  end

  create_table "subscriptions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "description"
    t.integer "sessions_count", default: 1, null: false
    t.string "type", default: "monthly", null: false
    t.decimal "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "stripe_price_id"
    t.string "additional_information"
  end

  create_table "user_member_challenge_check_ins", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "member_challenge_id"
    t.datetime "checkin_date"
    t.string "checkin_status"
    t.string "proof"
    t.string "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["member_challenge_id"], name: "index_user_member_challenge_check_ins_on_member_challenge_id"
    t.index ["user_id", "member_challenge_id", "checkin_date"], name: "user_member_challenge_checkin_index", unique: true
    t.index ["user_id"], name: "index_user_member_challenge_check_ins_on_user_id"
  end

  create_table "user_member_challenges", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "status"
    t.uuid "user_id"
    t.uuid "member_challenge_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["member_challenge_id"], name: "index_user_member_challenges_on_member_challenge_id"
    t.index ["user_id"], name: "index_user_member_challenges_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "sign_in_count", default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "name"
    t.string "nickname"
    t.string "avatar"
    t.string "email"
    t.string "role"
    t.boolean "is_onboarding_finished", default: false, null: false
    t.boolean "deleted", default: false, null: false
    t.jsonb "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "terms_and_privacy_confirmed", default: false, null: false
    t.jsonb "stripe", default: {}, null: false
    t.jsonb "email_notifications_settings", default: {}, null: false
    t.integer "lesson_count"
    t.string "subscription_type"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "vote_records", force: :cascade do |t|
    t.string "user_id"
    t.string "exercise_id"
    t.boolean "is_yes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "billing_records", "coach_profiles"
  add_foreign_key "billing_records", "meetings"
  add_foreign_key "billing_records", "member_profiles"
  add_foreign_key "billing_records", "subscriptions"
  add_foreign_key "coach_documents", "coach_profiles"
  add_foreign_key "coach_fitnes_domains", "coach_profiles"
  add_foreign_key "coach_fitnes_domains", "fitnes_domains"
  add_foreign_key "coach_profiles", "users"
  add_foreign_key "conversation_users", "conversations"
  add_foreign_key "conversation_users", "users"
  add_foreign_key "exercises", "users"
  add_foreign_key "meetings", "coach_profiles"
  add_foreign_key "meetings", "member_profiles"
  add_foreign_key "meetings", "programs"
  add_foreign_key "member_challenges", "users"
  add_foreign_key "member_crves", "users"
  add_foreign_key "member_fitnes_domains", "fitnes_domains"
  add_foreign_key "member_fitnes_domains", "member_profiles"
  add_foreign_key "member_profiles", "coach_profiles"
  add_foreign_key "member_profiles", "subscriptions"
  add_foreign_key "member_profiles", "users"
  add_foreign_key "member_question_answers", "users"
  add_foreign_key "messages", "conversations"
  add_foreign_key "messages", "users", column: "sender_id"
  add_foreign_key "notifications", "users"
  add_foreign_key "program_exercises", "exercises"
  add_foreign_key "program_exercises", "programs"
  add_foreign_key "programs", "coach_profiles"
  add_foreign_key "programs", "member_profiles"
  add_foreign_key "report_answers", "report_questions"
  add_foreign_key "report_answers", "reports"
  add_foreign_key "report_report_questions", "report_questions"
  add_foreign_key "report_report_questions", "reports"
  add_foreign_key "reports", "coach_profiles"
  add_foreign_key "reports", "meetings"
  add_foreign_key "reports", "member_profiles"
  add_foreign_key "user_member_challenge_check_ins", "member_challenges"
  add_foreign_key "user_member_challenge_check_ins", "users"
  add_foreign_key "user_member_challenges", "member_challenges"
  add_foreign_key "user_member_challenges", "users"
end
