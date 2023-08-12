class Api::V1::RushingsController < ApplicationController
    def statistics
        stats = Rails.cache.fetch('rushing_statistics') do 
            statistics_hash = Hash.new
            statistics_hash[:top_20_yards] = Rushing.top_20_yards
            statistics_hash[:top_20_tds] = Rushing.top_20_tds
            statistics_hash[:top_20_long] = Rushing.top_20_long
            statistics_hash[:top_20_attempts] = Rushing.top_20_attempts
            statistics_hash[:top_20_average] = Rushing.top_20_average

            statistics_hash
        end

        render json: stats
    end
end