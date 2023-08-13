class Api::V1::ReceivingsController < ApplicationController
    def statistics
        stats = Rails.cache.fetch('receiving_statistics', expires_in: 12.hours) do 
            statistics_hash = Hash.new
            statistics_hash[:top_20_yards] = Receiving.top_20_yards
            statistics_hash[:top_20_touchdowns] = Receiving.top_20_touchdowns
            statistics_hash[:top_20_long] = Receiving.top_20_long
            statistics_hash[:top_20_receptions] = Receiving.top_20_receptions
            statistics_hash[:top_20_average] = Receiving.top_20_average

            statistics_hash
        end

        render json: stats
    end

    def statistics_by_position
        position = statistics_params[:position]

        if position
            stats = Rails.cache.fetch("receiving_statistics_#{position}", expires_in: 12.hours) do 
                statistics_hash = Hash.new
                statistics_hash[:top_20_yards] = Receiving.top_20_yards(position)
                statistics_hash[:top_20_touchdowns] = Receiving.top_20_touchdowns(position)
                statistics_hash[:top_20_long] = Receiving.top_20_long(position)
                statistics_hash[:top_20_receptions] = Receiving.top_20_receptions(position)
                statistics_hash[:top_20_average] = Receiving.top_20_average(position)

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