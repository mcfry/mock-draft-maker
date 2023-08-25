# == Schema Information
#
# Table name: receivings
#
#  id         :uuid             not null, primary key
#  player_id  :bigint
#  year       :integer
#  receptions :integer
#  yards      :integer
#  long       :integer
#  touchdowns :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class ReceivingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
