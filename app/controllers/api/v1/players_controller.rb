class Api::V1::PlayersController < ApplicationController
  def index
    players_json = Rails.cache.fetch("all_player_info", expires_in: 12.hours) do
      players = Player.where("projected > ?", 0).includes(:passing, :rushing, :receiving, :defense)
        .all
        .order(:projected, :last, :first)

      players.to_json(methods: [:full_name, :passing, :rushing, :receiving, :defense, :total])
    end

    render json: players_json
  end

  def create
  end

  def show  
  end

  def destroy
  end

  def statistics_by_position
    position = statistics_params[:position]

    if position
        stats = Rails.cache.fetch("other_statistics_#{position}", expires_in: 12.hours) do 
            statistics_hash = Hash.new
            statistics_hash[:top_20_height] = Player.top_20_height(position)
            statistics_hash[:top_20_weight] = Player.top_20_weight(position)
            statistics_hash[:top_20_forty_time] = Player.top_20_forty_time(position)

            statistics_hash
        end

        render json: stats
      else
          render json: {
      message: 'Must include a position.'
    }.to_json, status: :bad_request
      end
  end

  private

  def statistics_params
      params.permit(:position)
  end
end
