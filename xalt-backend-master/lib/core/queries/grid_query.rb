# frozen_string_literal: true

class Core::Queries::GridQuery < Core::BaseQuery
  include Core::Queries::Concerns::PaginatedQuery
  include Core::Queries::Concerns::SearchQuery
  include Core::Queries::Concerns::SortedQuery
end
