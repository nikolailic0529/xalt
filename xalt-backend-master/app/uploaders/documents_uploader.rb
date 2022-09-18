# frozen_string_literal: true

class DocumentsUploader < CarrierWave::Uploader::Base
  def fog_public
    false
  end

  def store_dir
    "users_data/#{model.class.to_s.underscore}s/#{model.id}"
  end

  def cache_dir
    'tmp'
  end

  def extension_allowlist
    %w[jpg jpeg pdf]
  end

  def size_range
    1.byte..25.megabytes
  end
end
