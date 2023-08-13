class Rushing < ApplicationRecord
    belongs_to :player

    scope :by_position, -> (position) { joins(:player).where({player: {position: position}}) }

    attr_accessor :average, :top_20_yards, :top_20_tds, :top_20_long, :top_20_attempts, :top_20_average

    def average
        (yards.to_f / attempts.to_f).round(2)
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

    def self.top_20_attempts(position = nil)
        if position.nil?
            sum_and_average_20(all.order(attempts: :desc).limit(20).pluck(:attempts))
        else
            sum_and_average_20(by_position(position).order(attempts: :desc).limit(20).pluck(:attempts))
        end
    end

    def self.top_20_average(position = nil)
        if position.nil?
            sum_and_average_20(where("attempts > ?", 100).sort_by{|rush| rush.average}.reverse.take(20).map{|rush| rush.average})
        else
            sum_and_average_20(by_position(position).where("attempts > ?", 100).sort_by{|rush| rush.average}.reverse.take(20).map{|rush| rush.average})
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
