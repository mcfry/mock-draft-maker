class Defense < ApplicationRecord
    belongs_to :player

    scope :by_position, -> (position) { joins(:player).where({player: {position: position}}) }

    attr_accessor :total, :top_20_solo, :top_20_assisted, :top_20_sacks, :top_20_sack_yards, :top_20_passes_deflected, :top_20_interceptions, :top_20_int_yards, :top_20_int_long, :top_20_touchdowns, :top_20_forced_fumbles, :top_20_total

    def total
        solo + assisted
    end

    def self.top_20_solo(position = nil)
        if position.nil?
            sum_and_average_20(all.order(solo: :desc).limit(20).pluck(:solo))
        else
            sum_and_average_20(by_position(position).order(solo: :desc).limit(20).pluck(:solo))
        end
    end

    def self.top_20_assisted(position = nil)
        if position.nil?
            sum_and_average_20(all.order(assisted: :desc).limit(20).pluck(:assisted))
        else
            sum_and_average_20(by_position(position).order(assisted: :desc).limit(20).pluck(:assisted))
        end
    end

    def self.top_20_sacks(position = nil)
        if position.nil?
            sum_and_average_20(all.order(sacks: :desc).limit(20).pluck(:sacks))
        else
            sum_and_average_20(by_position(position).order(sacks: :desc).limit(20).pluck(:sacks))
        end
    end

    def self.top_20_sack_yards(position = nil)
        if position.nil?
            sum_and_average_20(all.order(sack_yards: :desc).limit(20).pluck(:sack_yards))
        else
            sum_and_average_20(by_position(position).order(sack_yards: :desc).limit(20).pluck(:sack_yards))
        end
    end

    def self.top_20_passes_deflected(position = nil)
        if position.nil?
            sum_and_average_20(all.order(passes_deflected: :desc).limit(20).pluck(:passes_deflected))
        else
            sum_and_average_20(by_position(position).order(passes_deflected: :desc).limit(20).pluck(:passes_deflected))
        end
    end

    def self.top_20_interceptions(position = nil)
        if position.nil?
            sum_and_average_20(all.order(interceptions: :desc).limit(20).pluck(:interceptions))
        else
            sum_and_average_20(by_position(position).order(interceptions: :desc).limit(20).pluck(:interceptions))
        end
    end

    def self.top_20_int_yards(position = nil)
        if position.nil?
            sum_and_average_20(all.order(int_yards: :desc).limit(20).pluck(:int_yards))
        else
            sum_and_average_20(by_position(position).order(int_yards: :desc).limit(20).pluck(:int_yards))
        end
    end

    def self.top_20_int_long(position = nil)
        if position.nil?
            sum_and_average_20(all.order(int_long: :desc).limit(20).pluck(:int_long))
        else
            sum_and_average_20(by_position(position).order(int_long: :desc).limit(20).pluck(:int_long))
        end
    end

    def self.top_20_tds(position = nil)
        if position.nil?
            sum_and_average_20(all.order(touchdowns: :desc).limit(20).pluck(:touchdowns))
        else
            sum_and_average_20(by_position(position).order(touchdowns: :desc).limit(20).pluck(:touchdowns))
        end
    end

    def self.top_20_forced_fumbles(position = nil)
        if position.nil?
            sum_and_average_20(all.order(forced_fumbles: :desc).limit(20).pluck(:forced_fumbles))
        else
            sum_and_average_20(by_position(position).order(forced_fumbles: :desc).limit(20).pluck(:forced_fumbles))
        end
    end

    def self.top_20_total(position = nil)
        if position.nil?
            sum_and_average_20(all.sort_by{|defense| defense.total}.reverse.take(20).map(&:total))
        else
            sum_and_average_20(by_position(position).sort_by{|defense| defense.total}.reverse.take(20).map(&:total))
        end
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
