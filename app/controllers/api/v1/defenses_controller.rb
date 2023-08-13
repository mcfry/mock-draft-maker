class Api::V1::DefensesController < ApplicationController
    def statistics
        stats = Rails.cache.fetch('defense_statistics', expires_in: 12.hours) do 
            statistics_hash = Hash.new
            statistics_hash[:top_20_solo] = Defense.top_20_solo
            statistics_hash[:top_20_assisted] = Defense.top_20_assisted
            statistics_hash[:top_20_sacks] = Defense.top_20_sacks
            statistics_hash[:top_20_sack_yards] = Defense.top_20_sack_yards
            statistics_hash[:top_20_passes_deflected] = Defense.top_20_passes_deflected
            statistics_hash[:top_20_interceptions] = Defense.top_20_interceptions
            statistics_hash[:top_20_int_yards] = Defense.top_20_int_yards
            statistics_hash[:top_20_int_long] = Defense.top_20_int_long
            statistics_hash[:top_20_tds] = Defense.top_20_tds
            statistics_hash[:top_20_forced_fumbles] = Defense.top_20_forced_fumbles
            statistics_hash[:top_20_total] = Defense.top_20_total

            statistics_hash
        end

        render json: stats
    end

    def statistics_by_position
        position = statistics_params[:position]

        if position
            stats = Rails.cache.fetch("defense_statistics_#{position}", expires_in: 12.hours) do 
                statistics_hash = Hash.new
                statistics_hash[:top_20_solo] = Defense.top_20_solo(position)
                statistics_hash[:top_20_assisted] = Defense.top_20_assisted(position)
                statistics_hash[:top_20_sacks] = Defense.top_20_sacks(position)
                statistics_hash[:top_20_sack_yards] = Defense.top_20_sack_yards(position)
                statistics_hash[:top_20_passes_deflected] = Defense.top_20_passes_deflected(position)
                statistics_hash[:top_20_interceptions] = Defense.top_20_interceptions(position)
                statistics_hash[:top_20_int_yards] = Defense.top_20_int_yards(position)
                statistics_hash[:top_20_int_long] = Defense.top_20_int_long(position)
                statistics_hash[:top_20_tds] = Defense.top_20_tds(position)
                statistics_hash[:top_20_forced_fumbles] = Defense.top_20_forced_fumbles(position)
                statistics_hash[:top_20_total] = Defense.top_20_total(position)

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