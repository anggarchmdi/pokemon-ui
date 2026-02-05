import { Card, CardContent, Skeleton } from "@mui/material"

export default function PokemonSkeleton() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <Skeleton
        variant="rectangular"
        height={170}
        animation="wave"
      />

      <CardContent>
        <div className="flex justify-center items-center">
        <Skeleton className="items-center" width="70%" height={24} />
        </div>
      </CardContent>
    </Card>
  )
}
