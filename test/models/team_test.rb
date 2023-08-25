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
require "test_helper"

class TeamTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
