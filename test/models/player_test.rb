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
require "test_helper"

class PlayerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
