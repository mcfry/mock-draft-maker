class Defense < ApplicationRecord
    belongs_to :player

    attr_accessor :total, :top_20_solo, :top_20_assisted, :top_20_sacks, :top_20_sack_yards, :top_20_passes_deflected, :top_20_interceptions, :top_20_int_yards, :top_20_int_long, :top_20_touchdowns, :top_20_forced_fumbles, :top_20_total

    def total
        solo + assisted
    end

    def self.top_20_solo
        sum_and_average_20(all.order(solo: :desc).limit(20).pluck(:solo))
    end

    def self.top_20_assisted
        sum_and_average_20(all.order(assisted: :desc).limit(20).pluck(:assisted))
    end

    def self.top_20_sacks
        sum_and_average_20(all.order(sacks: :desc).limit(20).pluck(:sacks))
    end

    def self.top_20_sack_yards
        sum_and_average_20(all.order(sack_yards: :desc).limit(20).pluck(:sack_yards))
    end

    def self.top_20_passes_deflected
        sum_and_average_20(all.order(passes_deflected: :desc).limit(20).pluck(:passes_deflected))
    end

    def self.top_20_interceptions
        sum_and_average_20(all.order(interceptions: :desc).limit(20).pluck(:interceptions))
    end

    def self.top_20_int_yards
        sum_and_average_20(all.order(int_yards: :desc).limit(20).pluck(:int_yards))
    end

    def self.top_20_int_long
        sum_and_average_20(all.order(int_long: :desc).limit(20).pluck(:int_long))
    end

    def self.top_20_touchdowns
        sum_and_average_20(all.order(touchdowns: :desc).limit(20).pluck(:touchdowns))
    end

    def self.top_20_forced_fumbles
        sum_and_average_20(all.order(forced_fumbles: :desc).limit(20).pluck(:forced_fumbles))
    end

    def self.top_20_total
        sum_and_average_20(all.sort_by{|defense| defense.total}.reverse.take(20).map(&:total))
    end

    def as_json(options = {})
        super(options).merge(total: total)
    end

    private

    def self.sum_and_average_20(array)
        (array.inject(0){ |total, cur| 
            total + cur
        }.to_f / 20).round(2)
    end
end
