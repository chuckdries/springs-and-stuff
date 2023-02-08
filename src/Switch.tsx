import { useToggleState } from "react-stately";
import {
  AriaSwitchProps,
  useFocusRing,
  useSwitch,
  VisuallyHidden,
} from "react-aria";
import { useRef } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export function Switch(props: AriaSwitchProps) {
  let state = useToggleState(props);
  let ref = useRef<HTMLInputElement>(null);
  let { inputProps } = useSwitch(props, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();

  const spring = useSpring({
    cx: state.isSelected ? 112 : 48,
    fill: state.isSelected ? "orange" : "gray",
  });

  const bind = useDrag(
    ({ down, movement: [mx, my], delta: [dx] }) => {
      if ((state.isSelected && mx > 0) || (!state.isSelected && mx < 0)) {
        return;
      }
      if (down) {
        const offset = spring.cx.get();
        spring.cx.set(Math.max(48, Math.min(112, offset + dx)));
        if (Math.abs(mx) > 30) {
          state.toggle();
        }
      }
    },
    {
      filterTaps: true,
      axis: "x",
    }
  );

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        opacity: props.isDisabled ? 0.4 : 1,
      }}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <svg
        width={160}
        height={96}
        aria-hidden="true"
        style={{ marginRight: 4 }}
      >
        <animated.rect
          x={16}
          y={16}
          width={128}
          height={64}
          rx={32}
          fill={spring.fill}
        />
        <animated.circle
          {...bind()}
          cx={spring.cx}
          cy={48}
          r={20}
          fill="white"
        />
        {isFocusVisible && (
          <rect
            x={4}
            y={4}
            width={152}
            height={88}
            rx={44}
            fill="none"
            stroke="orange"
            strokeWidth={2}
          />
        )}
      </svg>
      {props.children}
    </label>
  );
}
