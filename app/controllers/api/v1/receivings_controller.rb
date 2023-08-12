class Api::V1::ReceivingsController < ApplicationController
    def statistics
        stats = Rails.cache.fetch('receiving_statistics') do 
            statistics_hash = Hash.new
            statistics_hash[:top_20_yards] = Receiving.top_20_yards
            statistics_hash[:top_20_tds] = Receiving.top_20_tds
            statistics_hash[:top_20_long] = Receiving.top_20_long
            statistics_hash[:top_20_receptions] = Receiving.top_20_receptions
            statistics_hash[:top_20_average] = Receiving.top_20_average

            statistics_hash
        end

        render json: stats
    end
end