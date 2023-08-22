require 'securerandom'

class Api::V1::DraftRecordsController < ApplicationController
  def index
  end

  def create
    if draft_create_params[:draft_picks].present?
      draft_record = DraftRecord.create({
        id: SecureRandom.uuid,
        draft_picks: draft_create_params[:draft_picks],
        speed: draft_create_params[:speed],
        needs_vs_value: draft_create_params[:needsVsValue],
        randomness: draft_create_params[:randomness]
      })

      if draft_record
        render json: draft_record
      else
        render nothing: true, status: :no_content
      end
    else
      render json: {
				message: 'Post must include a non-empty draft_picks field.'
			}.to_json, status: :unprocessable_entity
    end
  end

  def show
    draft_record = DraftRecord.where({id: params[:uuid]}).first

    if draft_record
      render json: draft_record
    else
      render nothing: true, status: :no_content
    end
  end

  def destroy
  end

  private

    def draft_show_params
      params.permit(:uuid)
    end

    # Todo: fix
    def draft_create_params
      params.permit!
    end
end
