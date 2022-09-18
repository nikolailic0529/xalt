# frozen_string_literal: true

class Api::V1::Coach::CoachDocumentsController < Api::V1::Coach::BaseCoachController
  def index
    documents = find_documents_query

    render(json: documents, each_serializer: Coaches::DocumentsSerializer, status: :ok, include: inclusions_params)
  end

  def show
    document = find_document_query

    render(json: document, serializer: Coaches::DocumentsSerializer, status: :ok, include: inclusions_params)
  end

  def create
    document = run_command!(Coaches::Documents::Create,
                            params_with_current_user.merge(coach_profile: find_coach_profile))

    render(json: document, serializer: Coaches::DocumentsSerializer, status: :ok)
  end

  def destroy
    run_command!(Coaches::Documents::Delete, params_with_current_user.merge(document: find_document_query))

    render(json: {}, status: :ok)
  end

  def update
    document = run_command!(Coaches::Documents::Update, params_with_current_user.merge(document: find_document_query))

    render(json: document, serializer: Coaches::DocumentsSerializer, status: :ok)
  end

  protected

  def find_documents_query
    Documents::BaseQuery.call(params_with_current_user)
  end

  def find_document_query
    @find_document_query ||= find_documents_query.find(params_with_current_user[:id])
  end

  def find_coaches_profiles_query
    Coaches::Profiles::BaseQuery.call(params_with_current_user)
  end

  def find_coach_profile
    @find_coach_profile ||= find_coaches_profiles_query.find(params_with_current_user[:coach_profile_id])
  end
end
