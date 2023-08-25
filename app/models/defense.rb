# == Schema Information
#
# Table name: defenses
#
#  id               :uuid             not null, primary key
#  player_id        :bigint
#  year             :integer
#  solo             :integer
#  assisted         :integer
#  sacks            :float
#  sack_yards       :integer
#  passes_deflected :integer
#  interceptions    :integer
#  int_yards        :integer
#  int_long         :integer
#  touchdowns       :integer
#  forced_fumbles   :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Defense < ApplicationRecord
    include Top20Creator

    belongs_to :player

    scope :by_position, -> (position) { joins(:player).where({player: {position: position}}) }

    attr_accessor :total, :top_20_solo, :top_20_assisted, :top_20_sacks, :top_20_sack_yards, :top_20_passes_deflected, :top_20_interceptions, :top_20_int_yards, :top_20_int_long, :top_20_touchdowns, :top_20_forced_fumbles, :top_20_total

    # from Top20Creator - true for plural
    create_top_20(
        solo: { pluralize: false, order_asc: false },
        assisted: { pluralize: false, order_asc: false },
        sacks: { pluralize: true, order_asc: false },
        sack_yards: { pluralize: true, order_asc: false },
        passes_deflected: { pluralize: false, order_asc: false },
        interceptions: { pluralize: true, order_asc: false },
        int_yards: { pluralize: true, order_asc: false },
        int_long: { pluralize: false, order_asc: false },
        touchdowns: { pluralize: true, order_asc: false },
        forced_fumbles: { pluralize: true, order_asc: false }
      )

    def total
        solo + assisted
    end

    # Non Standard Top 20s
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
