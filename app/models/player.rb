# == Schema Information
#
# Table name: players
#
#  id           :bigint           not null, primary key
#  first        :string           not null
#  last         :string           not null
#  position     :string           not null
#  height       :integer
#  weight       :integer
#  player_class :string
#  college      :string
#  projected    :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  forty_time   :float
#
class Player < ApplicationRecord
    # Concerns
    include Top20Creator

    validates :first, presence: true
    validates :last, presence: true
    validates :position, presence: true
    validates :projected, presence: true

    has_many :picks
    has_one :passing, dependent: :destroy
    has_one :rushing, dependent: :destroy
    has_one :receiving, dependent: :destroy
    has_one :defense, dependent: :destroy

    scope :by_position, -> (position) { where(position: position) }

    attr_accessor :full_name, :total, :top_20_height, :top_20_weight, :top_20_forty_time

    create_top_20(
        height: { pluralize: false, order_asc: false },
        weight: { pluralize: false, order_asc: false },
        forty_time: { pluralize: false, order_asc: true }
    )

    def full_name
        [first, last].join(" ")
    end

    def total
        newTotal = Total.new(self, self.passing, self.rushing, self.receiving)

        if newTotal.total_plays > 0
            total = {
                plays: newTotal.total_plays,
                yards: newTotal.total_yards,
                yards_per_play: newTotal.yards_per_play,
                touchdowns: newTotal.total_touchdowns
            }
        else
            total = nil
        end
    end

    private

    def self.sum_and_average_20(array)
        # Use min value if not 20 records to get as close as possible
        (array.inject(0){ |total, cur|
            total + cur
        }.to_f / [20, array.length].min).round(2)
    end
end
