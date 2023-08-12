class Receiving < ApplicationRecord
    belongs_to :player

    attr_accessor :average, :top_20_yards, :top_20_tds, :top_20_long, :top_20_receptions, :top_20_average

    def average
        (yards.to_f / receptions.to_f).round(2)
    end

    def self.top_20_yards
        sum_and_average_20(all.order(yards: :desc).limit(20).pluck(:yards))
    end

    def self.top_20_tds
        sum_and_average_20(all.order(touchdowns: :desc).limit(20).pluck(:touchdowns))
    end

    def self.top_20_long
        sum_and_average_20(all.order(long: :desc).limit(20).pluck(:long))
    end

    def self.top_20_receptions
        sum_and_average_20(all.order(receptions: :desc).limit(20).pluck(:receptions))
    end

    def self.top_20_average
        sum_and_average_20(where("receptions > ?", 10).sort_by{|rec| rec.average}.reverse.take(20).map{|rec| rec.average})
    end

    def as_json(options = {})
        super(options).merge(average: average)
    end

    private

    def self.sum_and_average_20(array)
        (array.inject(0){ |total, cur| 
            total + cur
        }.to_f / 20).round(2)
    end
end
