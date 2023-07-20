class Team < ApplicationRecord
    validates :name, presence: true
    validates :city, presence: true
    validates :icon, presence: true

    has_many :picks
    has_many :players, through: :picks

    attr_accessor :full_name

    def full_name
        [city, name].join(" ")
    end
end
