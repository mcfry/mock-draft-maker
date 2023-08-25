require 'securerandom'

class Api::V1::DraftRecordsController < ApplicationController
  def index
  end

  def create
    if draft_create_params[:draft_picks].present?
      draft_record = DraftRecord.create({
        id: SecureRandom.uuid,
        year: draft_create_params[:year],
        speed: draft_create_params[:speed],
        needs_vs_value: draft_create_params[:needsVsValue],
        randomness: draft_create_params[:randomness]
      })

      draft_create_params[:draft_picks].each do |teamString, draft_picks|
        team_name = teamString.split(" ")[-1]
        team = Team.where(name: team_name).first

        drt = DraftRecordTeam.create({team_id: team.id, draft_record_id: draft_record.id})

        draft_picks.each do |playerJson|
          player = Player.where({
            first: playerJson[:first], 
            last: playerJson[:last], 
            position: playerJson[:position], 
            college: playerJson[:college]
          }).first

          pick = Pick.create({draft_record_team_id: drt.id, player_id: player.id, pick_number: playerJson[:pickedAt]})
        end
      end

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
    draft_record = DraftRecord.where({id: params[:uuid]}).includes(draft_record_teams: [:team, :picks]).first

    if draft_record
      render json: draft_record.as_json(include: { 
          draft_record_teams: { 
            include: [:team, picks: {
              include: :player
            }]
          } 
        }
      )
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
