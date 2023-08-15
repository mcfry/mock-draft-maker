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

  private
end
