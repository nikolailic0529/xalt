class ChangeFitnessDomainsNames < ActiveRecord::Migration[6.0]
  def up
    FitnesDomain.find_by(name: "improve lifestyle").update(name: "improve_lifestyle")
    FitnesDomain.find_by(name: "weight loss").update(name: "weight_loss")
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
