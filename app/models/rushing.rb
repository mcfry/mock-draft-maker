# == Schema Information
#
# Table name: rushings
#
#  id         :uuid             not null, primary key
#  player_id  :bigint
#  year       :integer
#  attempts   :integer
#  yards      :integer
#  long       :integer
#  touchdowns :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Rushing < ApplicationRecord
    include Top20Creator

    belongs_to :player

    scope :by_position, -> (position) { joins(:player).where({player: {position: position}}) }

    attr_accessor :average, :top_20_yards, :top_20_tds, :top_20_long, :top_20_attempts, :top_20_average

    # from Top20Creator - true for plural
    create_top_20(
        yards: { pluralize: true, order_asc: false },
        touchdowns: { pluralize: true, order_asc: false },
        long: { pluralize: false, order_asc: false },
        attempts: { pluralize: true, order_asc: false }
    )

    def average
        attempts > 0 ? (yards.to_f / attempts.to_f).round(2) : 0
    end

    # Non Standard Top 20s
    def self.top_20_average(position = nil)
        if position.nil?
            sum_and_average_20(where("attempts > ?", 100).sort_by{|rush| rush.average}.reverse.take(20).map{|rush| rush.average})
        else
            attemptsFilter = 10
            if position == "RB"
                attemptsFilter = 100
            end

            sum_and_average_20(by_position(position).where("attempts > ?", attemptsFilter).sort_by{|rush| rush.average}.reverse.take(20).map{|rush| rush.average})
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
