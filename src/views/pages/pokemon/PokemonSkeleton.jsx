import { Card, CardContent, Skeleton } from "@mui/material"

export default function PokemonSkeleton() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <Skeleton
        variant="rectangular"
        height={140}
        animation="wave"
      />

      <CardContent>
        <Skeleton width="60%" height={24} />
        <Skeleton width="40%" height={18} />
        <Skeleton width="80%" height={18} />
      </CardContent>
    </Card>
  )
}
