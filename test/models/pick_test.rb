# == Schema Information
#
# Table name: picks
#
#  id          :bigint           not null, primary key
#  team_id     :bigint
#  player_id   :bigint
#  year        :integer          not null
#  round       :integer          not null
#  pick_number :integer          not null
#  from        :string           default("Original")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require "test_helper"

class PickTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
