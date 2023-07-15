class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.string :city, null: false
      t.string :abbreviation, null: false
      t.string :conference, null: false
      t.string :division, null: false
      t.string :icon, default: 'https://d15mgyxo4zj1px.cloudfront.net/uploads/thumb_340e912d-2449-4bf4-98b7-8844908bb64d.png'

      t.timestamps
    end
  end
end
