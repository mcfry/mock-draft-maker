# == Schema Information
#
# Table name: receivings
#
#  id         :uuid             not null, primary key
#  player_id  :bigint
#  year       :integer
#  receptions :integer
#  yards      :integer
#  long       :integer
#  touchdowns :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Receiving < ApplicationRecord
    include Top20Creator

    belongs_to :player

    scope :by_position, -> (position) { joins(:player).where({player: {position: position}}) }

    attr_accessor :average, :top_20_yards, :top_20_tds, :top_20_long, :top_20_receptions, :top_20_average

    # from Top20Creator - true for plural
    create_top_20(
        yards: { pluralize: true, order_asc: false },
        touchdowns: { pluralize: true, order_asc: false },
        long: { pluralize: false, order_asc: false },
        receptions: { pluralize: true, order_asc: false }
    )

    def average
        (yards.to_f / receptions.to_f).round(2)
    end

    # Non Standard Top 20s
    def self.top_20_average(position = nil)
        if position.nil?
            sum_and_average_20(where("receptions > ?", 20).sort_by{|rec| rec.average}.reverse.take(20).map{|rec| rec.average})
        else
            receptionsFilter = 5
            if position == "WR"
                receptionsFilter = 20
            end
            
            sum_and_average_20(by_position(position).where("receptions > ?", receptionsFilter).sort_by{|rec| rec.average}.reverse.take(20).map{|rec| rec.average})
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
