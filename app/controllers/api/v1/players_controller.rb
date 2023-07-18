class Api::V1::PlayersController < ApplicationController
  def index
    players = Player.all.order(:projected, :last, :first)
    render json: players
  end

  def create
  end

  def show
    
  end

  def destroy
  end

  private
end
