class Receiving < ApplicationRecord
    belongs_to :player

    scope :by_position, -> (position) { joins(:player).where({player: {position: position}}) }

    attr_accessor :average, :top_20_yards, :top_20_tds, :top_20_long, :top_20_receptions, :top_20_average

    def average
        (yards.to_f / receptions.to_f).round(2)
    end

    # TODO: refactor these
    def self.top_20_yards(position = nil)
        if position.nil?
            sum_and_average_20(all.order(yards: :desc).limit(20).pluck(:yards))
        else
            sum_and_average_20(by_position(position).order(yards: :desc).limit(20).pluck(:yards))
        end
    end

    def self.top_20_tds(position = nil)
        if position.nil?
            sum_and_average_20(all.order(touchdowns: :desc).limit(20).pluck(:touchdowns))
        else
            sum_and_average_20(by_position(position).order(touchdowns: :desc).limit(20).pluck(:touchdowns))
        end
    end

    def self.top_20_long(position = nil)
        if position.nil?
            sum_and_average_20(all.order(long: :desc).limit(20).pluck(:long))
        else
            sum_and_average_20(by_position(position).order(long: :desc).limit(20).pluck(:long))
        end
    end

    def self.top_20_receptions(position = nil)
        if position.nil?
            sum_and_average_20(all.order(receptions: :desc).limit(20).pluck(:receptions))
        else
            sum_and_average_20(by_position(position).order(receptions: :desc).limit(20).pluck(:receptions))
        end
    end

    def self.top_20_average(position = nil)
        if position.nil?
            sum_and_average_20(where("receptions > ?", 10).sort_by{|rec| rec.average}.reverse.take(20).map{|rec| rec.average})
        else
            sum_and_average_20(by_position(position).where("receptions > ?", 10).sort_by{|rec| rec.average}.reverse.take(20).map{|rec| rec.average})
        end
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
