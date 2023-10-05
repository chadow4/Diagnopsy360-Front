import {initFlowbite} from "flowbite";

export function Flowbite() {
  return function (target: any) {
    const originalOnInit = target.prototype.ngOnInit;

    target.prototype.ngOnInit = function () {
      if (originalOnInit) {
        originalOnInit.apply(this);
      }

      initFlowbite();
    };
  };
}
