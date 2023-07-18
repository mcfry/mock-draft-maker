class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players do |t|
      t.string :first, null: false
      t.string :last, null: false
      t.integer :number
      t.string :position, null: false
      t.string :college
      t.integer :projected, null: false

      t.timestamps
    end
  end
end
