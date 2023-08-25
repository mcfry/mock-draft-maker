# == Schema Information
#
# Table name: rushings
#
#  id         :uuid             not null, primary key
#  player_id  :bigint
#  year       :integer
#  attempts   :integer
#  yards      :integer
#  long       :integer
#  touchdowns :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class RushingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
