# == Schema Information
#
# Table name: teams
#
#  id           :uuid             not null, primary key
#  name         :string           not null
#  city         :string           not null
#  abbreviation :string           not null
#  conference   :string           not null
#  division     :string           not null
#  icon         :string           default("https://d15mgyxo4zj1px.cloudfront.net/uploads/thumb_340e912d-2449-4bf4-98b7-8844908bb64d.png")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Team < ApplicationRecord
    validates :name, presence: true
    validates :city, presence: true
    validates :icon, presence: true

    has_many :draft_record_teams

    attr_accessor :full_name

    def full_name
        [city, name].join(" ")
    end
end
