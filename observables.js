
const { Observable, pipe, fromEvent } = rxjs;
const { filter, map, switchMap, catchError, of, throttleTime } = rxjs.operators;
const { fromFetch } = rxjs.fetch;

const btnMorkload = document.querySelector('.btn-workload');

const clicks$ = fromEvent(btnMorkload, 'click');

clicks$.pipe(throttleTime(1000)).subscribe(data => {
  showWorkload();
})

let calculations$;

function showWorkload() {
  const data$ = fromFetch(urlCalculations).pipe(
    switchMap(response => response.ok ? response.json() : of({ error: true, message: `Error ${response.status}` })),
    catchError(err => of({ error: true, message: err.message }))
  );
  
  data$.pipe(
    filter(data => data.workingHours > 120),
    map(data => {
      if (data.workingDays > 10) {
        return {
          ...data,
          isAvailableForVacation: true,
        }
      }
    }),
  ).subscribe((data) => {
    showMassage(`Your normal workload is ${(data.workingHours / data.workingDays).toFixed(1)} hours per day`)
  });
} 
