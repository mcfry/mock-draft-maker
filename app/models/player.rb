class Player < ApplicationRecord
    validates :first, presence: true
    validates :last, presence: true
    validates :position, presence: true
    validates :projected, presence: true

    has_many :picks
    has_many :teams, through: :picks
    has_one :passing, dependent: :destroy
    has_one :rushing, dependent: :destroy
    has_one :receiving, dependent: :destroy
    has_one :defense, dependent: :destroy

    attr_accessor :full_name, :total

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
end
