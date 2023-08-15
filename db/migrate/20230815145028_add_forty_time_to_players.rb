class AddFortyTimeToPlayers < ActiveRecord::Migration[7.0]
  def change
    add_column :players, :forty_time, :float
  end
end
