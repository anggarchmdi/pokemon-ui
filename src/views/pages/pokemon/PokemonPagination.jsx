import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

function PokemonPagination({ page, totalPage, onChange }) {
  return (
    <Stack spacing={2} alignItems="center" mt={8}>
      <Pagination
        count={totalPage}
        page={page}
        onChange={(e, value) => onChange(value)}
        shape="rounded"
        color="warning"
      />
    </Stack>
  )
}

export default PokemonPagination
