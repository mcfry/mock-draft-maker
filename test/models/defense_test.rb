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
require "test_helper"

class DefenseTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
