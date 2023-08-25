class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players do |t|
      t.string :first, null: false
      t.string :last, null: false
      t.string :position, null: false
      t.integer :height
      t.integer :weight
      t.string :player_class
      t.string :college
      t.integer :projected, null: false
      t.float :forty_time

      t.timestamps
    end
  end
end
