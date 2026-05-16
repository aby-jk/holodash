import { Badge, type BadgeVariant } from '../atoms/Badge'

type CalibrationState = 'success' | 'not-calibrated' | 'error'

interface CalibrationStatusProps {
  state: CalibrationState
  label?: string
}

const stateVariant: Record<CalibrationState, BadgeVariant> = {
  success:          'success',
  'not-calibrated': 'default',
  error:            'error',
}

const defaultLabel: Record<CalibrationState, string> = {
  success:          'Calibrated',
  'not-calibrated': 'Not Calibrated',
  error:            'Error',
}

export function CalibrationStatus({ state, label }: CalibrationStatusProps) {
  return (
    <Badge
      variant={stateVariant[state]}
      label={label ?? defaultLabel[state]}
    />
  )
}
