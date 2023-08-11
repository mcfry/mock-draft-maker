class Api::V1::PlayersController < ApplicationController
  def index
    players = Player.includes(:passing, :rushing, :receiving, :defense)
    .all
    .order(:projected, :last, :first)

    render json: players.to_json(methods: [:full_name, :passing, :rushing, :receiving, :defense, :total])
  end

  def create
  end

  def show
    
  end

  def destroy
  end

  private
end
