class Player < ApplicationRecord
    validates :first, presence: true
    validates :last, presence: true
    validates :position, presence: true
    validates :projected, presence: true

    has_many :picks
    has_many :teams, through: :picks

    attr_accessor :full_name

    def full_name
        [first, last].join(" ")
    end
end
