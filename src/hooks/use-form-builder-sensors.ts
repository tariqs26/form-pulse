import {
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DndContextProps,
} from "@dnd-kit/core"

export const useFormBuilderSensors = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  })

  // mobile devices
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300, // 300ms
      tolerance: 5, // 5px
    },
  })

  // Allows delete button and properties trigger to be clicked, because the drag activation constraint distance is 10px
  const sensors: DndContextProps["sensors"] = useSensors(
    mouseSensor,
    touchSensor,
  )

  return sensors
}
