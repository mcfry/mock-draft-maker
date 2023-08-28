class Api::V1::DraftRecordTeamsController < ApplicationController

  def statistics
    minPick = params[:pick] ? [params[:pick].to_i-16, 0].max : 0
    maxPick = params[:pick] ? [params[:pick].to_i+16, 264].min : 264

    base_query = Pick.joins(:team, :player).where(team: {id: params[:team_id]}).where(player: {projected: minPick..maxPick})
    team_picks = base_query.group(:player).order('count_all DESC').limit(9).count
    total_count = base_query.count()

    team_name = Team.where(id: params[:team_id]).first.name

    player_picks = team_picks.map { |player, count| 
        { player: player.as_json, team: team_name, count: count } 
    }

    if team_picks
      render json: {total_count: total_count, picks: player_picks}
    else
      render json: { message: "No content." }, status: :no_content
    end
  end

end